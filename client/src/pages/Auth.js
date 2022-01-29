import React, { useContext, useState } from "react";
import {Container, Form} from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {NavLink, useLocation, useHistory} from 'react-router-dom';
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


const Auth = observer(() => {
  const {user} = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try{
      let data;
      if (isLogin){
        data = await login(email, password);
      } else {
        data = await registration(email, password)
      }
      user.setUser(user);
      user.setIsAuth(true);
      history.push(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
     
  }

  return (
    <Container 
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control 
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={e=>setEmail(e.target.value)}
          ></Form.Control>
          <Form.Control 
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={e=>setPassword(e.target.value)}
            type='password'
          ></Form.Control>
          <Row className="d-flex justify-content-between mt-3 px-3">
          <Button variant={"outline-dark"} onClick={click}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
          {isLogin ? 
            <div className="mt-3">Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink></div> 
            :
            <div className="mt-3">Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink></div>
          }   
          </Row>
        </Form>
      </Card>

    </Container>
  );
})

export default Auth;