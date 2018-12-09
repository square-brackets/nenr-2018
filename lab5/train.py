import json
import time
import numpy as np

import nn
import layers

config = {}
config['max_epochs'] = 1000
config['batch_size'] = 10
config['lr_policy'] = {1: {'lr': 1e-1}, 3: {'lr': 1e-2}, 5: {'lr': 1e-3}, 7: {'lr': 1e-4}}

with open('./data.json') as f:
  data_file = json.load(f)

train_x = []
train_y = []
for data_group in data_file["data"]:
  output = data_group["output"]
  for input_data in data_group["input"]:
    x_data = []
    for input_value in input_data:
      x_data.append(input_value[0])
      x_data.append(input_value[1])

    train_x.append(x_data)
    train_y.append(output)

train_x = np.array(train_x)
train_y = np.array(train_y)

net = []
inputs = np.random.randn(config['batch_size'], len(train_x))
net += [layers.FC(inputs, 50, "fc1")]
net += [layers.Sigmoid(net[-1], "sg1")]
net += [layers.FC(net[-1], 10, "fc2")]
net += [layers.Sigmoid(net[-1], "sg2")]
net += [layers.FC(net[-1], 5, "fc3")]

loss = layers.MeanSquareError()

nn.train(train_x, train_y, net, loss, config)

while True:
  pointsFilename = input("Enter file name:")
  with open(pointsFilename) as f:
    points = json.load(f)
    points = np.array(points).reshape(1, 100)
  nn.evaluate(net, np.array(points))
  print('DONE')
