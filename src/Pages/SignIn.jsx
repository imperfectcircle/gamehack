import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../Supabase/client';
import useAuthStore from '../Store/authStore';
import { useNavigate } from 'react-router-dom';
import InputText from '../Components/UI/InputText';
import InputLabel from '../Components/UI/InputLabel';
import PasswordInput from '../Components/UI/PasswordInput';
import Button from '../Components/UI/Button';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function SignIn() {
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
    const navigate = useNavigate();

    const { t } = useTranslation();

    const submit = async (values) => {
        const form = {
            email: values.email,
            password: values.password,
            confirm_password: values.confirm_password,
            options: {
                data: {
                    username: values.username,
                    first_name: values.first_name,
                    last_name: values.last_name,
                },
            },
        };

        try {
            const { data, error } = await supabase.auth.signUp(form);

            if (error) {
                console.log(error.message.message);
            }

            if (data.session !== null) {
                setLoggedIn(data.session);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Formik
            initialValues={{
                password: '',
                confirm_password: '',
                email: '',
                username: '',
                first_name: '',
                last_name: '',
            }}
            validationSchema={Yup.object({
                password: Yup.string()
                    .min(6, 'Must be 6 characters or more')
                    .required(),
                username: Yup.string()
                    .min(6, 'Must be 6 characters or more')
                    .required(),
                confirm_password: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Required'),
                first_name: Yup.string()
                    .min(3, 'Must be 3 characters or more')
                    .required('Required'),
                last_name: Yup.string()
                    .min(3, 'Must be 3 characters or more')
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
            })}
            onSubmit={(values) => submit(values)}
        >
            <div className=" mt-16 px-5 md:px-0">
                <Helmet>
                    <title>{t('common.register')}</title>
                </Helmet>

                <p className="mb-10 text-center text-2xl font-bold first-letter:uppercase">
                    {t('common.register')}
                </p>
                <Form className="mb-10 space-y-4 rounded-lg bg-white p-10 shadow-lg dark:bg-slate-500 md:mx-auto md:w-5/12">
                    <div className="flex flex-col space-y-2">
                        <InputLabel htmlFor="first_name" content="First Name" />

                        <Field
                            // className="rounded-lg shadow-lg focus:bg-emerald-100 dark:bg-gray-200 dark:text-black dark:focus:bg-emerald-400"
                            name="first_name"
                            type="text"
                            component={InputText}
                            placeholder="First Name"
                        />
                        <ErrorMessage name="first_name" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <InputLabel htmlFor="last_name" content="Last Name" />

                        <Field
                            // className="rounded-lg shadow-lg focus:bg-emerald-100 dark:bg-gray-200 dark:text-black dark:focus:bg-emerald-400"
                            name="last_name"
                            type="text"
                            component={InputText}
                            placeholder="Last Name"
                        />
                        <ErrorMessage name="last_name" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <InputLabel htmlFor="user_name" content="User Name" />

                        <Field
                            // className="rounded-lg shadow-lg focus:bg-emerald-100 dark:bg-gray-200 dark:text-black dark:focus:bg-emerald-400"
                            name="username"
                            type="text"
                            component={InputText}
                            placeholder="User Name"
                        />
                        <ErrorMessage name="username" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <InputLabel htmlFor="email" content="Email Address" />
                        <Field
                            // className="rounded-lg shadow-lg focus:bg-emerald-100 dark:bg-gray-200 dark:text-black dark:focus:bg-emerald-400"
                            name="email"
                            type="email"
                            component={InputText}
                            placeholder="Email Address"
                        />
                        <ErrorMessage name="email" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <InputLabel htmlFor="password" content="Password" />
                        <Field
                            // className="rounded-lg shadow-lg focus:bg-emerald-100 dark:bg-gray-200 dark:text-black dark:focus:bg-emerald-400"
                            name="password"
                            component={PasswordInput}
                            // type="password"
                        />
                        <ErrorMessage name="password" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <InputLabel
                            htmlFor="confirm_password"
                            content="Confirm Password"
                        />
                        <Field
                            // className="rounded-lg shadow-lg focus:bg-emerald-100 dark:bg-gray-200 dark:text-black dark:focus:bg-emerald-400"
                            name="confirm_password"
                            component={PasswordInput}
                            // type="password"
                        />
                        <ErrorMessage name="confirm_password" />
                    </div>
                    <div className="mt-5 text-center">
                        <Button content={t('common.register')} />
                    </div>
                </Form>
            </div>
        </Formik>
    );
}
