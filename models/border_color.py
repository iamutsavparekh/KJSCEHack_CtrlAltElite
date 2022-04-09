from PIL import Image, ImageOps

def add_border(input_image, output_image, border, color=0):
    img = Image.open(input_image)
    if isinstance(border, int) or isinstance(border, tuple):
        bimg = ImageOps.expand(img, border=border, fill=color)
    else:
        raise RuntimeError('Border is not an integer or tuple!')
    bimg.save(output_image)
if __name__ == '__main__':
    in_img = 'jpeg_trial.png'
    add_border(in_img,
               output_image='border.png',
               border=25,
               color='black')
