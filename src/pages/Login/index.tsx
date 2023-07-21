import { useDispatch } from 'react-redux';
import { login } from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { initialValues, validationSchema } from './validationSchema';
import { useFormik } from 'formik';
import { Label } from '../../atom/FormLable';
import { Input } from '../../atom/InputBox';
import { Button } from '../../atom/Button';
import { PageBackground, Card } from './LoginFormStyles';
import { NotificationIconType, showToast } from '../../atom/Notification';


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (values: any) => {
    dispatch(login({ name: values.username, email: values.email }));
    showToast({
      message: "Login successful. Enjoy your music journey!",
      description: "",
      iconType: NotificationIconType.CHECKED,
    });
    navigate('/home');
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (val, actions) => handleFormSubmit(val),
    validationSchema: validationSchema,
  });

  const { handleSubmit, values, setFieldValue, errors } = formik;

  return (
    <PageBackground>
      <Card>
        <div>
          <Label text='Name' ismandatory={true} />
          <Input
            id="username"
            name="username"
            placeholder="Enter First Name"
            value={values.username}
            error={errors.username}
            onChange={(e: any) => {
              setFieldValue("username", e.target.value);
            }}
          />
        </div>

        <div>
          <Label text='Email' ismandatory={true} />
          <Input
            id="email"
            name="email"
            placeholder="Enter Email"
            value={values.email}
            error={errors.email}
            onChange={(e: any) => {
              setFieldValue("email", e.target.value);
            }}
          />
        </div>

        <div>
          <Label text='Password' ismandatory={true} />
          <Input
            id="password"
            name="password"
            type='password'
            placeholder="Enter Password"
            value={values.password}
            error={errors.password}
            onChange={(e: any) => {
              setFieldValue("password", e.target.value);
            }}
          />
        </div>

        <Button
          variant="primary"
          size={"large"}
          text={"Submit"}
          type={"submit"}
          onClick={handleSubmit}
        />
      </Card>
    </PageBackground>
  );
};

export default LoginForm;
