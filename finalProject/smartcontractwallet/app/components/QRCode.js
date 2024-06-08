import ClipButton from "../components/Clipboard";

export default function QRCODE(props) {
  return (
    <article className="m-10 flex flex-col justify-center">
      <img
        className=" m-5"
        src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${props.data}&color=028391&bgcolor=000000`}
        alt="Account address"
      />
      <div className="m-5">
        <ClipButton text={props.data} />
      </div>
    </article>
  );
}
