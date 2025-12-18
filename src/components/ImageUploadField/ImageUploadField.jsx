import './ImageUploadField.css'
import { uploadImage } from '../../services/cloudinary'

export default function ImageUploadField({ labelText = 'Upload an Image', fieldName = "image", setImage, imageURL }) {

    const handleFieldUpload = async (e) => {

        try {
            const file = e.target.files[0]
            const { data } = await uploadImage(file)
            setImage(data.secure_url)

        } catch (error) {
            console.log(error)

        }


    }

    const latestImage =
        Array.isArray(imageURL) && imageURL.length > 0
            ? imageURL[imageURL.length - 1]
            : null



    return (
        <div className="image-upload-field">
            {latestImage && (
                <div className="image-preview-wrapper">
                    <img
                        className="uploaded-image"
                        src={latestImage}
                        alt=""
                    />
                </div>
            )}

            <label htmlFor={fieldName}>{labelText}</label>
            <input
                type="file"
                name={fieldName}
                id={fieldName}
                onChange={handleFieldUpload}
                accept="image/*"
            />
        </div>
    )
}
