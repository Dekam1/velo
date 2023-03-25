import React from "react";
import Header from "../components/header/Header";
import img from "../assets/img/main-img.jpg"
import Footer from "../components/footer/Footer";
import Context from "../Context";
import LoadingPage from "../components/loading-page/LoadingPage";

export default function Main() {

    const { loading } = React.useContext(Context);

    return (
        loading ? <LoadingPage /> : <div className="wrapper">
            <Header />
            <main className="main">
                <div className="container">
                    <div className="main_info">
                        <div className="main_info_img">
                            <img width={500} src={img} alt="main img"></img>
                        </div>
                        <div className="main_info_text">
                            <h1 className="main_info_title">ВелоРан</h1>
                            <div className="main_info_greetings">
                                <p>Рады приветствовать всех любителей велосипедов на нашем сайте.</p>
                                <p>Проект ВелоРан нечто большее, чем обычный сервис по прокату велосипедов. Мы уверены и знаем, что под нашим началом мир станет куда лучше.</p>
                                <p>Мы искренно верим и надеемся, что интерес к велосипедам и их популярность в нашем городе будет только расти. Мы приложим максимум услилий, чтобы достичь этого.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}