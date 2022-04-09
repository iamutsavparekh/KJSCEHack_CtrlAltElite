from PIL import Image, ImageOps
 
def colorize(filename,black,white):

    img = Image.open(filename).convert("L")
    new = ImageOps.colorize(img, black = black, white = white)
    new.save("colorized_"+filename)
    
if __name__ == '__main__':  
    colorize('jpeg_trial.jpg',
        "black","yellow")
