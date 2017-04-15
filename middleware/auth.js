export default function({
    store,
    redirect,
    error
}) {

		// console.log(store.state.userData);
		if (store.state.userData === false ) {
			return redirect('/login');
		}

}
