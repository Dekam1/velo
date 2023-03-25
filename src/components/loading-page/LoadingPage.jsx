import style from "./style.module.scss";

export default function LoadingPage() {
    return (
        <div className={style.loading}>
           <p>Загрузка...</p>
        </div>
    )
}