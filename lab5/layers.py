from abc import ABCMeta, abstractmethod
import numpy as np
import scipy
import scipy.stats as stats
import math

def sigmoid(x):
  return 1.0 / (1.0 + np.exp(-x))

zero_init = np.zeros

def softmax(x):
    exps = np.exp(x)
    return np.divide(exps, np.sum(exps, axis=1, keepdims=True))


def variance_scaling_initializer(shape, fan_in, factor=1.0, seed=None):
  sigma = np.sqrt(factor / fan_in)
  return stats.truncnorm(-1, 1, loc=0, scale=sigma).rvs(shape)

# -- ABSTRACT CLASS DEFINITION --

class Layer(metaclass=ABCMeta):
  @abstractmethod
  def forward(self, inputs):
    pass

  @abstractmethod
  def backward_inputs(self, grads):
    pass

  def backward_params(self, grads):
    pass

class FC(Layer):
  def __init__(self, input_layer, num_outputs, name,
               weights_initializer_fn=variance_scaling_initializer,
               bias_initializer_fn=zero_init):

    self.input_shape = input_layer.shape
    self.N = self.input_shape[0]
    self.shape = (self.N, num_outputs)
    self.num_outputs = num_outputs

    self.num_inputs = 1
    for i in range(1, len(self.input_shape)):
      self.num_inputs *= self.input_shape[i]

    self.weights = weights_initializer_fn(
        [num_outputs, self.num_inputs], fan_in=self.num_inputs)
    self.bias = bias_initializer_fn([num_outputs])
    self.name = name
    self.has_params = True

  def forward(self, inputs):
    self.forward_inputs = inputs
    return np.add(np.dot(inputs, self.weights.T), self.bias)

  def backward_inputs(self, grads):
    return np.dot(grads, self.weights)

  def backward_params(self, grads):
    grad_weights = np.dot(grads.T, self.forward_inputs)
    grad_bias = np.sum(grads, axis=0)
    return [[self.weights, grad_weights], [self.bias, grad_bias], self.name]

class MeanSquareError():
  def __init__(self):
    self.has_params = False

  def forward(self, x, y):
    diff = np.subtract(x, y)
    return np.sum(np.square(diff)) / diff.shape[0]

  def backward_inputs(self, x, y):
    return np.divide(np.subtract(x, y), x.shape[0])

class Sigmoid():
  def __init__(self, input_layer, name):
    self.has_params = False
    self.shape = input_layer.shape
    self.name = name

  def forward(self, inputs):
    return sigmoid(inputs)

  def backward_inputs(self, grads):
    return grads
    # return sigmoid(grads) * (1 - sigmoid(grads))
