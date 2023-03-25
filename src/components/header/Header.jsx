import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import logo from "./img/header-logo.png";
import Context from "../../Context";

export default function Header() {
    const navigate = useNavigate();
    const { user } = React.useContext(Context);
    const { signout } = useAuth();
    const emptyOrder = !Object.keys(user).length;

    const handleClick = () => {
        signout(() => navigate('/', { replace: true }));
    }

    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.header_wrapper}>
                    <div className={style.header_logo}>
                        <Link to='/'>
                            <img width={100} src={logo} alt="logo"></img>
                        </Link>
                    </div>
                    {!emptyOrder ? <nav className={style.header_nav}>
                        <Link to='/report' className={style.header_nav_link}>Сообщить о краже</Link>
                        <Link to='/allOfficers' className={style.header_nav_link}>Ответственные сотрудники</Link>
                        <Link to='/allCases' className={style.header_nav_link}>Сообщения о кражах</Link>

                        <div className={style.user}>
                            <a href="#" className={style.user_name}>
                                <span>{user.firstName}</span>
                            </a>
                            <button onClick={handleClick} className={style.signout}>
                                Выйти
                            </button>
                        </div>
                    </nav> : <nav className={style.header_nav}>
                        <Link to='/report' style={{ width: '19%' }} className={style.header_nav_link} href="#">Сообщить о краже</Link>
                        <div className={style.header_buttons}>
                            <Link to='/signup'>
                                <button className={style.signup}>Зарегистроваться</button>
                            </Link>
                            <Link to='/signin'>
                                <button className={style.signin}>Войти</button>
                            </Link>
                        </div>
                    </nav>
                    }
                </div>
            </div>
        </header>
    )
}