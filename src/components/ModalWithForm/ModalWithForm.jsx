import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        {children}
        <button onClick={onClose} type="button" className="modal__close" />
        <form action="" className="modal__form">
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
