export function getCookie (name: string) {
	let value = `; ${document.cookie}`;
	let parts = value.split(`; ${name}=`);
    // @ts-ignore
    // @todo: Refactor type error: Object is possibly undefined on <parts>
    if (parts.length) return parts.pop().split(';').shift();
};