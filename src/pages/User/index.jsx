import { WingBlank, Button } from "antd-mobile";

function User(props) {
  //#region 退出登录
  const Logout = () => {
    window.localStorage.removeItem("token");
    props.history.push("/login");
  };
  //#endregion
  return (
    <div>
      <h1>User</h1>
      <WingBlank>
        <Button type="warning" onClick={Logout}>
          退出登录
        </Button>
      </WingBlank>
    </div>
  );
}

export default User;
