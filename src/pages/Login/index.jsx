import { useEffect, useRef, useState } from "react";
import { List, InputItem, Flex, Button, WingBlank, WhiteSpace, Toast } from "antd-mobile";

import { httpPost } from "../../utils/axios/http";
import { user } from "../../api";

// 引入 validator 校验器
import validator from "validator";

import "./index.css";

// 密码校验规则
const passwordOptions = {
  minLength: 8, // 最小长度
  minLowercase: 1, // 最少需要小写字母
  minUppercase: 0, // 最少需要大写字母
  minNumbers: 1, // 最少需要数字
  minSymbols: 0, // 最少需要符号
  returnScore: false, // 是否返回分数
  // 分数计算规则
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
};

const Login = props => {
  // 手机号码
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const phoneRef = useRef();
  // 密码
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordRef = useRef();

  // 手机号码校验
  useEffect(() => {
    if (phone.replace(/\s/g, "").length <= 0 || validator.isMobilePhone(phone.replace(/\s/g, ""), "zh-CN")) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  }, [phone]);

  // 密码校验
  useEffect(() => {
    if (password.trim().length <= 0 || validator.isStrongPassword(password.trim(), passwordOptions)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [password]);

  // 校验是否有 token
  useEffect(() => {
    console.log("login props", props);
    // 获取 token 令牌
    const token = localStorage.getItem("token");
    // 如果有则跳转到后台首页
    if (!!token) {
      Toast.success("您已登录，正在跳转……", 1);
      // 取出 state 里的重定向数据
      if (props.location.state && props.location.state.redirect) return props.history.push({ pathname: "/admin", state: { redirect: decodeURIComponent(props.location.state.redirect) } });
      // 取出重定向路径
      if (props.location.search.length > 0) {
        const searchData = new URLSearchParams(props.location.search);
        const redirect = searchData.get("redirect");
        // 判断是否需要重定向
        if (redirect) return props.history.push({ pathname: "/admin", state: { redirect: decodeURIComponent(redirect) } });
      } else {
        // 没有重定向路径默认跳转到后台首页
        props.history.push({ pathname: "/admin" });
      }
    }
  }, []);

  // 注册
  const registerCilck = () => {
    Toast.info("如需注册账号或修改密码，请联系相关工作人员");
  };

  // 登录
  const loginClick = () => {
    console.log(phoneError, phone.replace(/\s/g, "").trim(), passwordError, password);
    // 判断校验是否通过
    if (phone.replace(/\s/g, "").length <= 0 || phoneError) {
      Toast.fail("请输入正确的手机号码", 3, null, false);
      phoneRef.current.focus();
    } else if (password.trim().length <= 0 || passwordError) {
      Toast.fail("请输入正确的密码", 3, null, false);
      passwordRef.current.focus();
    } else {
      //
      Toast.loading("正在登录……", 0, null, true);
      // 发送请求
      httpPost(user.Login, {
        phone: phone.replace(/\s/g, "").trim(),
        password: password.trim(),
      })
        .then(res => {
          // 请求成功
          console.log(res);
          if (res.meta.status === 200) {
            // 弹出提示
            Toast.success("登录成功", 3, null, false);
            // 保存 token
            localStorage.setItem("token", res.message.token);
            // 保存公司名称和公司简称
            localStorage.setItem("company_id", res.message.company_id);
            localStorage.setItem("company_name", res.message.company_name);
            localStorage.setItem("company_mini_name", res.message.company_mini_name);

            // 取出 state 里的重定向数据
            if (props.location.state && props.location.state.redirect) return props.history.push({ pathname: "/admin", state: { redirect: decodeURIComponent(props.location.state.redirect) } });
            // 取出重定向路径
            if (props.location.search.length > 0) {
              const searchData = new URLSearchParams(props.location.search);
              const redirect = searchData.get("redirect");
              // 判断是否需要重定向
              if (redirect) return props.history.push({ pathname: "/admin", state: { redirect: decodeURIComponent(redirect) } });
            }
            // 没有重定向路径默认跳转到后台首页
            props.history.push("/admin");
          }
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    phoneRef.current.focus();
  }, []);

  return (
    <div>
      <h1 className="title">登录</h1>
      <List>
        <InputItem
          type="phone"
          placeholder="199 9999 9999"
          clear
          name="phone"
          value={phone}
          onChange={val => setPhone(val)}
          error={phoneError}
          onErrorClick={() => Toast.info("请输入11位的手机号码")}
          ref={phoneRef}
        >
          手机号码
        </InputItem>
        <InputItem
          type="password"
          placeholder="******"
          clear
          name="password"
          value={password}
          onChange={val => setPassword(val)}
          error={passwordError}
          onErrorClick={() => Toast.info("密码必须8位以上并且包含小写字母和数字")}
          ref={passwordRef}
        >
          密码
        </InputItem>
      </List>
      <WhiteSpace size="lg" />
      <Flex>
        <Flex.Item>
          <WingBlank>
            <Button onClick={registerCilck}>没有账号?</Button>
          </WingBlank>
        </Flex.Item>
        <Flex.Item>
          <WingBlank>
            <Button type="primary" onClick={loginClick}>
              登录
            </Button>
          </WingBlank>
        </Flex.Item>
      </Flex>
    </div>
  );
};

export default Login;
