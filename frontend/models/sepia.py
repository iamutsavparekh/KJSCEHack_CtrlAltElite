import cv2
import numpy as np
#pass img
def sepia_filter(img):
    kernel = np.array([[0.272, 0.534, 0.131],
                        [0.349, 0.686, 0.168],
                        [0.393, 0.769, 0.189]])
    sepia=cv2.filter2D(img, -1, kernel)
    cv2.imwrite('Sepia.jpg',sepia)