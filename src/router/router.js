import App from '../App'

const Zhoubao = r => require.ensure([], () => r(require('../views/zhoubao/zhoubao.vue')), 'Zhoubao')
const Contact = r => require.ensure([], () => r(require('../views/zhoubao/contact.vue')), 'Contact')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
},{
    path: '/zhoubao',
    component: Zhoubao,
},{
    path: '/contact',
    component: Contact,
}]