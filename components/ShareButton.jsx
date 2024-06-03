import { FaShare } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

function ShareButton({ property }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2"></h3>
      <div className="flex gap-3 justify-center pd-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
      </div>
    </>
  );
}

export default ShareButton;
