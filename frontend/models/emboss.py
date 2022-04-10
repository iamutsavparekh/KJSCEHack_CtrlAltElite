import numpy as np
import cv2
def emboss_filter(img):
    kernel = np.array([[0,-1,-1],
                            [1,0,-1],
                            [1,1,0]])
    emboss=cv2.filter2D(img, -1, kernel*5)
    cv2.imwrite('Emboss.jpg',emboss)