import os
from datetime import datetime
import exifread
from shutil import move
import logging

logging.basicConfig(level=logging.INFO)

def get_creation_date(file_path):
    try:
        with open(file_path, 'rb') as image_file:
            tags = exifread.process_file(image_file, stop_tag='EXIF DateTimeOriginal')
            if 'EXIF DateTimeOriginal' in tags:
                return datetime.strptime(str(tags['EXIF DateTimeOriginal']), '%Y:%m:%d %H:%M:%S')
            else:
                return datetime.fromtimestamp(os.path.getmtime(file_path))
    except Exception as e:
        logging.error(f"Error processing file {file_path}: {e}")
        return None

def organize_photos(folder_path):
    try:
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)

            try:
                if not os.path.isfile(file_path) or not filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                    logging.warning(f"Skipped {filename}: Unsupported file type")
                    continue

                creation_date = get_creation_date(file_path)
                if creation_date:
                    year_folder = os.path.join(folder_path, str(creation_date.year))

                    if not os.path.exists(year_folder):
                        os.makedirs(year_folder)

                    destination_path = os.path.join(year_folder, filename)

                    # Check if the destination file already exists
                    counter = 1
                    while os.path.exists(destination_path):
                        filename_without_extension, extension = os.path.splitext(filename)
                        filename = f"{filename_without_extension}_{counter}{extension}"
                        destination_path = os.path.join(year_folder, filename)
                        counter += 1

                    move(file_path, destination_path)
                    logging.info(f'Moved {filename} from {file_path} to {destination_path}')
                else:
                    logging.warning(f"Skipped {filename}: Couldn't determine creation date.")
            except Exception as e:
                logging.warning(f"Skipped {filename}: Error processing file - {e}")

    except Exception as e:
        logging.error(f"Error organizing photos: {e}")

# Specify the folder containing your photos
folder_to_organize = '/path/to/your/photo/folder'
organize_photos(folder_to_organize)