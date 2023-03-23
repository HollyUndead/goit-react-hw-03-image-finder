export const Modal = (props) =>{
    const {largeImageURL, closeModal, modalActive} = props
    let modalClass = "Overlay is-hidden"
    if(modalActive === true){
        modalClass = "Overlay"
    }
    return(
        <div className={modalClass} onClick={closeModal}>
            <div className="Modal">
                <img src={largeImageURL} alt="" />
            </div>
        </div>
    )
}