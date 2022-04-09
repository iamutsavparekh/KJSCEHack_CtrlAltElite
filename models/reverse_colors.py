from PIL import Image
import numpy as np

def reverse_color(filename):
    image = Image.open(filename)
    img_data = np.array(image)
    img_reversed_data = 255 - img_data
    img_reversed = Image.fromarray(img_reversed_data)
    img_reversed.save("reversed_"+filename)
    
if __name__ == '__main__':
    
    reverse_color("png_trial.png")



