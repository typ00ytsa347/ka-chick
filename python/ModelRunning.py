import os
import sys
import numpy as np
import joblib
from skimage.io import imread
from skimage.color import rgb2gray
from skimage.feature import hog
from skimage.transform import resize
import joblib
from sklearn import svm

def run():

    #Retrieve all parameters. When Python files are called from JavaScript, the first parameter is always the file path of
    #the Python script, thus the first parameter is ignored
    count = 0
    for i in sys.argv:
        if count == 1:
            width = int(i)
        elif count == 2:
            height = int(i)
        count = count + 1

    #Set size if image array based on given width and height. There will always be 3 colours + 1 transparency value, hence the 4
    imageSize = [[[0 for a in range(3)] for b in range(width)] for c in range(height)]
    image = np.array(imageSize)

    #Open file with image text
    textDump = open("../python/imageTextDumpSVM.txt", "r")

    #Assign looping indexes for image array
    currentNumber = ""
    currentWidthIndex = 0
    currentHeightIndex = 0
    currentColourIndex = 0

    #Loop through all characters in text
    while 1:
        char = textDump.read(1)

        #If at end, break
        if not char:
            break

        #If the next character is any non-delimiter, add it to the current number we are forming
        if char != "," and char != " ":
            currentNumber = currentNumber + char
        #If the next character is a delimiter and we have a stored number, add it to the array, and empty the array
        elif (char == "," or char == " ") and currentNumber != "":
            if currentColourIndex < 3:
                image[currentHeightIndex][currentWidthIndex][currentColourIndex] = int(currentNumber)
            currentNumber = ""

            #Now, check indexing values and update them accordingly
            currentColourIndex = currentColourIndex + 1
            if currentColourIndex > 3:
                currentColourIndex = 0
                currentWidthIndex = currentWidthIndex + 1
                if currentWidthIndex > width - 1:
                    currentHeightIndex = currentHeightIndex + 1
                    currentWidthIndex = 0

    textDump.close()

    #Model parameters and HOG function parameters
    res = 200
    ori = 8
    pix_cell = 20
    cell_blk = 4
    HOGsize = ( pow( int( cell_blk * ( ( res / pix_cell ) - cell_blk + 1 ) ), 2 ) ) * ori

    #Resize image
    image = resize(image, (res, res, 3))

    #Make grayscale for lower computation costs. Since images are black and white text anyway, there is
    #No result on performance
    image = rgb2gray(image)

    #Perform HOG function on image
    image = hog(image, orientations = ori, pixels_per_cell = (pix_cell, pix_cell), cells_per_block = (cell_blk, cell_blk))

    #Place image inside an array so that the SVM can accept it
    imagesPredict = [image]

    #Load model
    model = joblib.load("../ML Letters/Model Data/LIN_SVM")

    #Predict data
    Pred = model.predict(imagesPredict)
    print(Pred[0])

run()