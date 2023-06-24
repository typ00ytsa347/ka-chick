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
from sklearn.svm import OneClassSVM
from sklearn.model_selection import GridSearchCV
import time

def run():

    print("Running PreProcessing...")

    #Retrieve all parameters. When Python files are called from JavaScript, the first parameter is always the file path of
    #the Python script, thus the first parameter is ignored
    count = 0
    originalPath = ""
    modelPath = ""
    for i in sys.argv:
        if count == 1:
            originalPath = i + "\\Model Training"
            modelPath = i + "\\Model Data"
        count = count + 1

    print("Original Path: " + originalPath)
    print("Model Path: " + modelPath)

    #Define scaler
    scaler = StandardScaler()

    #Model parameters and HOG function parameters
    res = 80

    #The total number of images in all classes
    imageNum = 10 * 32 + 320

    #Input and output lists. Their sizes are based on the size of the HOG output, as well as the number of images
    X_size = [[0.1 for a in range(80*80*3)] for b in range(imageNum)]
    X = np.array(X_size)

    #Parameter used to loop across X and Y arrays
    index = 0

    #Read all class folders; here dirs will loop through the values A --> J
    for dirs in os.listdir(originalPath):

        #Filter out all of the following directories
        if dirs != "X":

        #Read all images inside a folder dirs
            for img in os.listdir(os.path.join(originalPath, dirs)):

                #Get current image
                currentImage = imread(os.path.join(os.path.join(originalPath, dirs), img))

                #Resize image
                currentImage = resize(currentImage, (res, res, 3))

                #Make grayscale for lower computation costs. Since images are black and white text anyway, there is
                #No result on performance
                #currentImage = rgb2gray(currentImage)

                #Perform HOG function on image
                #currentImage = hog(currentImage, orientations = ori, pixels_per_cell = (pix_cell, pix_cell), cells_per_block = (cell_blk, cell_blk))

                #Flatten Image
                currentImage = currentImage.flatten()

                currentImage = currentImage.reshape(-1,1)
                currentImage = scaler.fit_transform(currentImage)
                currentImage = currentImage.reshape(1,-1)
                currentImage = currentImage[0]

                #Add HOGified image value to X array
                for i in range(len(currentImage)):
                    X[index][i] = currentImage[i]

                #Move to next index in X and Y for next loop
                index = index + 1

    print("Running SVM...")

    #-----------------------------------LINEAR---------------------------------------

    #Initialise model
    lin_svm = OneClassSVM(kernel="linear", gamma=0.001, max_iter=100000)

    #Fit model
    lin_svm.fit(X)

    #Get predictions
    Y_pred = lin_svm.predict(X)

    #Dump model
    try:
        f = open(os.path.join(modelPath, "LIN_OCSVM"), "xb")
    except:
        f= open(os.path.join(modelPath, "LIN_OCSVM"), "wb")
    joblib.dump(lin_svm, f)
    f.close()

    #-----------------------------------POLYNOMIAL---------------------------------------

    #Initialise model
    poly_svm = OneClassSVM(kernel="poly", gamma=0.001, max_iter=100000)

    #Fit model
    poly_svm.fit(X)

    #Get predictions
    Y_pred = poly_svm.predict(X)

    #Dump model
    try:
        f = open(os.path.join(modelPath, "POLY_OCSVM"), "xb")
    except:
        f= open(os.path.join(modelPath, "POLY_OCSVM"), "wb")
    joblib.dump(poly_svm, f)
    f.close()

    #-----------------------------------ROUND---------------------------------------

    #Initialise model
    rbf_svm = OneClassSVM(kernel="rbf", gamma=0.001, max_iter=100000)

    #Fit model
    rbf_svm.fit(X)

    #Get predictions
    Y_pred = rbf_svm.predict(X)

    #Dump model
    try:
        f = open(os.path.join(modelPath, "RBF_OCSVM"), "xb")
    except:
        f= open(os.path.join(modelPath, "RBF_OCSVM"), "wb")
    joblib.dump(rbf_svm, f)
    f.close()

#Run entire function
run()