import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import InputLabel from '../Components/UI/InputLabel';
import InputText from '../Components/UI/InputText';
import PasswordInput from '../Components/UI/PasswordInput';
import Button from '../Components/UI/Button';
import { supabase } from '../Supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../Store/authStore';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { t } = useTranslation();

    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

    const navigate = useNavigate();

    const submit = async (values) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });
            if (error) {
                setMessage(error.message);
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
        <div className="mt-16">
            <Helmet>
                <title>{t('common.login')}</title>
            </Helmet>
            <div className="min-h-screen px-5 md:mx-auto md:w-2/3 md:px-0">
                <p className="mb-10 text-center text-2xl font-bold first-letter:uppercase">
                    {t('common.login')}
                </p>

                <Formik
                    initialValues={{
                        password: '',
                        email: '',
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string().min(
                            3,
                            'Must be 3 characters or more',
                        ),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                    })}
                    onSubmit={(values) => submit(values)}
                >
                    <Form className="mx-auto mb-10 rounded-lg bg-white p-10 shadow-lg dark:bg-slate-500 md:w-5/12 ">
                        <div className="flex flex-col space-y-2">
                            <InputLabel htmlFor="email" content="Email" />

                            <Field
                                name="email"
                                type="email"
                                component={InputText}
                                placeholder="Email Address"
                            />
                            <ErrorMessage name="email" />
                        </div>

                        <div className="mt-4 flex flex-col space-y-2">
                            <InputLabel htmlFor="password" content="Password" />

                            <Field name="password" component={PasswordInput} />
                            <ErrorMessage name="password" />
                        </div>
                        {message && (
                            <p className="my-5 text-center text-lg text-red-500">
                                {message}
                            </p>
                        )}
                        <div className="mt-5 text-center">
                            <Button content={t('common.login')} />
                        </div>
                        <div className="mt-5 text-center">
                            <p>
                                Don&apos;t have an account?{' '}
                                <Link
                                    className="transition-all duration-150 hover:text-orange-500"
                                    to="/sign-in"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
