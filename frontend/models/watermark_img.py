from PIL import Image
def watermark_photo(input_image_path,
                    output_image_path,
                    watermark_image_path,
                    position):
    base_image = Image.open(input_image_path)
    watermark = Image.open(watermark_image_path)
    watermark=watermark.resize((50,50),Image.ANTIALIAS)
    # add watermark to your image
    base_image.paste(watermark, position)
    base_image.save(output_image_path)
if __name__ == '__main__':
    img = 'jpeg_trial.jpg'
    watermark_photo(img, 'watermarked_photo.jpg',
                         'png_trial.jpg', position=(0,0))
