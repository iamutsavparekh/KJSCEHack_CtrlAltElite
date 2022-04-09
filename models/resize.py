import cv2

def resize(frame,h,w):
    dim = (w,h)
    resized = cv2.resize(frame, dim, interpolation = cv2.INTER_AREA)
    cv2.imwrite('Resized.jpg',resized)