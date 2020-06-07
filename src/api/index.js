import Sendsay from 'sendsay-api';

const sendsay = new Sendsay();

export const login = async (params) => {
    try {
        await sendsay.login(params);
        return (
            {
                ok: true,
                session: sendsay.session,
            }
        )
    } catch(err) {
        return (
            {
                ok: false,
                err,
            }
        );
    }
}