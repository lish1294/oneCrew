import Uploader from "./components/Uploader";
import Loader from "./Loader.js";

function App() {
  return (
    <div className="App">
      { <Uploader/> }

      <br/> How Adobe PDF Embed works using their config:
      { <Loader/> }
      Around the web I might have seen the SDK work with AWS with previewFileUsingFilePromise().
      <div>
      <br/> EC's S3 Lambdas <br/>
      Uploads to S3 instance: <a href="https://codepen.io/eclerigo/pen/vYWMWmb"> https://codepen.io/eclerigo/pen/vYWMWmb </a>  <br/>
      Gets an arbitrary Presigned URL: <a href="https://codepen.io/eclerigo/pen/ExbJbNb"> https://codepen.io/eclerigo/pen/ExbJbNb </a>  <br/>
      </div>
    </div>


  );
}

export default App;
