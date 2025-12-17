import { useState } from 'react'
import GpxUploadField from '../components/GpxUploadField/GpxUploadField'

export default function GpxTest() {
  const [gpxUrl, setGpxUrl] = useState('')

  return (
    <div style={{ padding: '2rem' }}>
      <h1>GPX Upload Test</h1>

      <GpxUploadField
        setGpxUrl={setGpxUrl}
        gpxUrl={gpxUrl}
      />

      {gpxUrl && (
        <pre style={{ marginTop: '1rem' }}>
          {gpxUrl}
        </pre>
      )}
    </div>
  )
}
