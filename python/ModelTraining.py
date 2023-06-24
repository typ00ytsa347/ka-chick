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
    res = 200
    ori = 8
    pix_cell = 20
    cell_blk = 4
    HOGsize = ( pow( int( cell_blk * ( ( res / pix_cell ) - cell_blk + 1 ) ), 2 ) ) * ori
    testSize = 0.3

    print("HOG size: " + str(HOGsize))

    #The total number of images in all classes
    imageNum = 10 * 32

    #Input and output lists. Their sizes are based on the size of the HOG output, as well as the number of images
    X_size = [[0.1 for a in range(HOGsize)] for b in range(imageNum)]
    Y_size = [0.1 for b in range(imageNum)]
    X = np.array(X_size)
    Y = np.array(Y_size)

    #Parameter used to loop across X and Y arrays
    index = 0

    #The current index of the directory or class we are in
    dirsCount = 0

    #Read all class folders; here dirs will loop through the values A --> J
    for dirs in os.listdir(originalPath):

        #Filter out all of the following directories
        if dirs != "Other":

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

                #Add HOGified image value to X array
                for i in range(len(currentImage)):
                    X[index][i] = currentImage[i]

                #Add class value to Y array
                Y[index] = dirsCount

                #Move to next index in X and Y for next loop
                index = index + 1

        #Move to next folder for next loop
        dirsCount = dirsCount + 1

    #Make test and train sets
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = testSize, shuffle = True, random_state = 1, stratify = Y)

    print("Running SVM...")

    #Initialise SVM parameters
    Gamma = [1000, 10, 0.1, 0.001]
    C = [1000, 10, 0.1, 0.001]
    Degree = [3, 4, 5]
    iter = [100000]

    #-----------------------------------LINEAR---------------------------------------

    #Make parameter grid
    lin_param_grid={"C": C, "gamma": Gamma, "kernel": ["linear"], "max_iter": iter}

    #Initialise model
    svc = svm.SVC(probability=True)
    lin_model = GridSearchCV(svc, lin_param_grid)

    #Fit model
    lin_model.fit(X_train, Y_train)

    #Get predictions
    Y_pred = lin_model.predict(X_test)

    #Show results
    print("Best parameters for linear model were achieved with: ")
    print(lin_model.best_params_)
    print("Accuracy of linear model: ")
    print(100 * np.sum(Y_pred == Y_test)/len(Y_test))

    #Dump model
    try:
        f = open(os.path.join(modelPath, "LIN_SVM"), "xb")
    except:
        f= open(os.path.join(modelPath, "LIN_SVM"), "wb")
    joblib.dump(lin_model, f)
    f.close()

    #-----------------------------------POLYNOMIAL---------------------------------------

    #Make parameter grid
    poly_param_grid={"C": C, "gamma": Gamma, "degree": Degree, "kernel": ["poly"], "max_iter": iter}

    #Initialise model
    svc = svm.SVC(probability=True)
    poly_model = GridSearchCV(svc, poly_param_grid)

    #Fit model
    poly_model.fit(X_train, Y_train)

    #Get predictions
    Y_pred = poly_model.predict(X_test)

    #Show results
    print("Best parameters for polynomial model were achieved with: ")
    print(poly_model.best_params_)
    print("Accuracy of polynomial model: ")
    print(100 * np.sum(Y_pred == Y_test)/len(Y_test))

    #Dump model
    try:
        f = open(os.path.join(modelPath, "POLY_SVM"), "xb")
    except:
        f= open(os.path.join(modelPath, "POLY_SVM"), "wb")
    joblib.dump(poly_model, f)
    f.close()

    #-----------------------------------ROUND---------------------------------------

    #Make parameter grid
    rbf_param_grid={"C": C, "gamma": Gamma, "kernel": ["rbf"], "max_iter": iter}

    #Initialise model
    svc = svm.SVC(probability=True)
    rbf_model = GridSearchCV(svc, rbf_param_grid)

    #Fit model
    rbf_model.fit(X_train, Y_train)

    #Get predictions
    Y_pred = rbf_model.predict(X_test)

    #Show results
    print("Best parameters for rbf model were achieved with: ")
    print(rbf_model.best_params_)
    print("Accuracy of rbf model: ")
    print(100 * np.sum(Y_pred == Y_test)/len(Y_test))

    #Dump model
    try:
        f = open(os.path.join(modelPath, "RBF_SVM"), "xb")
    except:
        f= open(os.path.join(modelPath, "RBF_SVM"), "wb")
    joblib.dump(rbf_model, f)
    f.close()

#Run entire function
run()