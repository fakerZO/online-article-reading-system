// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import Home from '../pages/Home'
import Index from '../pages/Index'
import Person from '../pages/Person'
import Novel from '../pages/Novel'
import Professional_books from '../pages/Professional_books'
import reference_books from '../pages/reference_books'
import Upload from '../pages/Upload'
import SearchRes from '../pages/SearchRes'
import Login from '../pages/Login'
import Register from '../pages/register'
import Recommend from '../pages/recommend'
import Context from '../pages/Context'


//创建并暴露一个路由器
export default new VueRouter({
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login,
		},
		{
			path: '/Register',
			component: Register,
		},
		{
			path: '/Context',
			name: 'Context',
			component: Context,
		},
		{
			path: '/Home',
			name: 'Home',
			component: Home,
			children: [
				{
					path: '/Home/Index',
					name: "Index",
					component: Index,
				},
				{
					path: '/Home/Person',
					name: "Person",
					component: Person,
				}, {
					path: '/Home/Novel',
					name: "Novel",
					component: Novel,
				}, {
					path: '/Home/Professional_books',
					name: "Professional_books",
					component: Professional_books,
				}, {
					path: '/Home/reference_books',
					name: "reference_books",
					component: reference_books,
				},
				{
					path: '/Home/Upload',
					name: "Upload",
					component: Upload,
				}, {
					path: '/Home/SearchRes',
					name: "SearchRes",
					component: SearchRes,
				}, {
					path: '/Home/Recommend',
					name: "Recommend",
					component: Recommend,
				},
			]
		},
	]
})
