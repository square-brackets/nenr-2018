import os
import math
import numpy as np

def forward_pass(net, inputs):
  output = inputs
  for layer in net:
    output = layer.forward(output)
  return output

def backward_pass(net, loss, x, y):
  grads = []
  grad_out = loss.backward_inputs(x, y)
  for layer in reversed(net):
    grad_inputs = layer.backward_inputs(grad_out)
    if layer.has_params:
      grads += [layer.backward_params(grad_out)]
    grad_out = grad_inputs
  return grads

def sgd_update_params(grads, config):
  lr = config['lr']
  for layer_grads in grads:
    for i in range(len(layer_grads) - 1):
      params = layer_grads[i][0]
      grads = layer_grads[i][1]
      params -= lr * grads

def train(train_x, train_y, net, loss, config):
  lr_policy = config['lr_policy']
  batch_size = config['batch_size']
  max_epochs = config['max_epochs']

  num_examples = train_x.shape[0]
  assert num_examples % batch_size == 0
  num_batches = num_examples // batch_size

  for epoch in range(1, max_epochs + 1):
    if epoch in lr_policy:
      solver_config = lr_policy[epoch]
    cnt_correct = 0

    permutation_idx = np.random.permutation(num_examples)
    train_x = train_x[permutation_idx]
    train_y = train_y[permutation_idx]

    for i in range(num_batches):
      batch_x = train_x[i*batch_size:(i+1)*batch_size, :]
      batch_y = train_y[i*batch_size:(i+1)*batch_size, :]

      logits = forward_pass(net, batch_x)
      loss_val = loss.forward(logits, batch_y)
      
      yp = np.argmax(logits, 1)
      yt = np.argmax(batch_y, 1)
      # print('YY', yp, yt, (yp == yt).sum())
      cnt_correct += (yp == yt).sum()
      grads = backward_pass(net, loss, logits, batch_y)
      sgd_update_params(grads, solver_config)

      print("epoch %d, step %d/%d, batch loss = %.2f" % (epoch, (i + 1) * batch_size, num_examples, loss_val))
      print("Train accuracy = %.2f" % (cnt_correct / ((i+1)*batch_size) * 100))

    print("Train accuracy = %.2f" % (cnt_correct / num_examples * 100))
  return net


def evaluate(net, points):
  logits = forward_pass(net, points)
  yp = np.argmax(logits, 1)
  print(logits)
  print(yp)