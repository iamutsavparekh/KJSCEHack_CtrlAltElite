import cv2
def rescale_frame(frame, percent):
    width = int(frame.shape[1] * percent/ 100)
    height = int(frame.shape[0] * percent/ 100)
    dim = (width, height)
    res= cv2.resize(frame, dim, interpolation=cv2.INTER_AREA)
    cv2.imwrite('Res.jpg',res)