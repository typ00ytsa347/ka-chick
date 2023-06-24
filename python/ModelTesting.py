import sys
import os

import numpy as np
from skimage.io import imread
from skimage.color import rgb2gray
from skimage.feature import hog
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from skimage.transform import resize
import joblib
from sklearn import svm
from sklearn.model_selection import GridSearchCV
import time

def run():

    #Retrieve all parameters. When Python files are called from JavaScript, the first parameter is always the file path of
    #the Python script, thus the first parameter is ignored
    count = 0
    originalPath = ""
    modelPath = ""
    for i in sys.argv:
        if count == 1:
            originalPath = i + "\\Model Testing"
            modelPath = i + "\\Model Data"
        count = count + 1

    print("Original Path: " + originalPath)
    print("Model Path: " + modelPath)

    #Define scaler
    scaler = StandardScaler()

    #Model parameters and HOG function parameters
    res = 200
    ori = 8
    pix_cell = 20
    cell_blk = 4
    HOGsize = ( pow( int( cell_blk * ( ( res / pix_cell ) - cell_blk + 1 ) ), 2 ) ) * ori

    print("HOG size: " + str(HOGsize))

    #Parameter used to loop across X and Y arrays
    index = 0

    #The current index of the directory or class we are in
    dirsCount = 0

    #Load model
    model = joblib.load(os.path.join(modelPath, "LIN_SVM"))

    #Read all class folders; here dirs will loop through the values A --> J
    for dirs in os.listdir(originalPath):

        print("Directory: " + dirs)

    #Read all images inside a folder dirs
        for img in os.listdir(os.path.join(originalPath, dirs)):

            #Get current image
            currentImage = imread(os.path.join(os.path.join(originalPath, dirs), img))

            #Resize image
            currentImage = resize(currentImage, (res, res, 3))

            #Make grayscale for lower computation costs. Since images are black and white text anyway, there is
            #No result on performance
            currentImage = rgb2gray(currentImage)

            #Perform HOG function on image
            currentImage = hog(currentImage, orientations = ori, pixels_per_cell = (pix_cell, pix_cell), cells_per_block = (cell_blk, cell_blk))


            #Place image inside an array so that the SVM can accept it
            imagesPredict = [currentImage]

            #Predict data
            Pred = model.decision_function(imagesPredict)
            print(Pred[0])
            Pred = model.predict(imagesPredict)
            print(Pred[0])

#Run entire function
run()