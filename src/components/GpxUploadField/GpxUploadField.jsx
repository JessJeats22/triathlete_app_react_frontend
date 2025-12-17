import { uploadGpx } from '../../services/cloudinary'

export default function GpxUploadField({
  labelText = 'Upload GPX file',
  fieldName = 'gpx',
  setGpxUrl,
  gpxUrl
}) {

  const handleFieldUpload = async (e) => {
    try {
      const file = e.target.files[0]
      if (!file) return

      // Basic client-side guard
      if (!file.name.toLowerCase().endsWith('.gpx')) {
        alert('Please upload a .gpx file')
        return
      }

      const { data } = await uploadGpx(file)
      setGpxUrl(data.secure_url)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {gpxUrl && (
        <p>
          GPX uploaded:{' '}
          <a href={gpxUrl} target="_blank" rel="noreferrer">
            View file
          </a>
        </p>
      )}

      <label htmlFor={fieldName}>{labelText}</label>
      <input
        type="file"
        name={fieldName}
        id={fieldName}
        accept=".gpx"
        onChange={handleFieldUpload}
      />
    </>
  )
}
