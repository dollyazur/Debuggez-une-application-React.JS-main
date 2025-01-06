import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(), // date par défaut en attendant d'en avoir une
  title,
  label,
  small = false,
  ...props
}) => {
  // Ici, on vérifie que la date est une vraie date magique
  const validDate = date instanceof Date ? date : new Date(date);

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >

      {/* Image de la carte */}
      <div className="EventCard__imageContainer" id="">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>

      {/* Description de la carte */}
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>


        {/* On utilise `getMonth` pour afficher le mois correct */}
        <div className="EventCard__month">{getMonth(validDate)}</div>
      </div>
    </div>
  );
};


EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
}

export default EventCard;
