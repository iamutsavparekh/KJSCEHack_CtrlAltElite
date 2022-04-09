from PIL import Image
import numpy as np


def apply_background(filename_orignal,filename_background):
    
    img = Image.open(filename_orignal)
    background = Image.open(filename_background)
    background = background.resize(img.size,Image.ANTIALIAS)
    background.paste(img, (0, 0), img)
    background.save('superimposed.png',"PNG")
    
if __name__ == '__main__':
    
    apply_background("png_trial.png","trial_img.png")
