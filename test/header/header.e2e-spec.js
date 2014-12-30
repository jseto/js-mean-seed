describe('HeaderCtrl', function(){

	beforeEach(function(){
		browser().navigateTo('app/index.html');
	});

	it('Test array key', function () {
		pause();
		expect( binding('{{header.home | loc}}') ).toBe('Inici');
	});
});
