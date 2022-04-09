import cv2
def paint(frame):
    kern = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15,15))
    frame7 = cv2.erode(frame.copy(), kern)
    cv2.imwrite('Paint.jpg',frame7)