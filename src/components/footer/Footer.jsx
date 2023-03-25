import style from "./style.module.scss"

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className="container">
                <div className={style.footer_wrapper}>
                    <div className={style.copyright}>
                        ВелоРан copyright © 2023
                    </div>
                </div>
            </div>
        </footer>
    )
}