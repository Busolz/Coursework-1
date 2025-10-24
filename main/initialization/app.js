const App = {
  components: { 
    HeaderBar, 
    LoginView, 
    RegisterView, 
    LessonList, 
    CartView 
  },
  data() {
    return {
      view: 'login',
      users: [],
      loggedInUser: null,
      loginError: '',
      registerError: '',
      searchQuery: '',
      sort: { by: 'subject', order: 'asc' },
      lessons: [
        { id: 1, subject: 'Math', location: 'Hendon', price: 100, spaces: 5, icon: 'fa-solid fa-square-root-variable' },
        { id: 2, subject: 'English', location: 'Colindale', price: 80, spaces: 6, icon: 'fa-solid fa-book' },
        { id: 3, subject: 'Coding', location: 'Brent Cross', price: 90, spaces: 5, icon: 'fa-solid fa-laptop-code' },
        { id: 4, subject: 'Music', location: 'Golders Green', price: 95, spaces: 4, icon: 'fa-solid fa-music' },
        { id: 5, subject: 'Art', location: 'Hendon', price: 70, spaces: 3, icon: 'fa-solid fa-palette' },
        { id: 6, subject: 'Science', location: 'Colindale', price: 110, spaces: 7, icon: 'fa-solid fa-flask' },
        { id: 7, subject: 'Drama', location: 'Brent Cross', price: 85, spaces: 5, icon: 'fa-solid fa-theater-masks' },
        { id: 8, subject: 'Robotics', location: 'Golders Green', price: 130, spaces: 2, icon: 'fa-solid fa-robot' },
        { id: 9, subject: 'Dance', location: 'Hendon', price: 75, spaces: 6, icon: 'fa-solid fa-person-dance' },
        { id: 10, subject: 'Spanish', location: 'Colindale', price: 65, spaces: 5, icon: 'fa-solid fa-language' },
      ],
      cart: {},
      form: { name: '', phone: '' },
      orderDone: false,
    };
  },
  computed: {
    filteredLessons() {
      const q = this.searchQuery.toLowerCase().trim();
      if (!q) return this.lessons;
      return this.lessons.filter((l) => 
        Object.values(l).some((v) => String(v).toLowerCase().includes(q))
      );
    },
    sortedLessons() {
      const arr = [...this.filteredLessons];
      const key = this.sort.by;
      const order = this.sort.order === 'asc' ? 1 : -1;
      arr.sort((a, b) => {
        let av = a[key], bv = b[key];
        if (typeof av === 'string') av = av.toLowerCase();
        if (typeof bv === 'string') bv = bv.toLowerCase();
        return av > bv ? order : av < bv ? -order : 0;
      });
      return arr;
    },
    cartItems() {
      return Object.values(this.cart);
    },
    cartCount() {
      return this.cartItems.reduce((s, c) => s + c.qty, 0);
    },
    cartTotal() {
      return this.cartItems.reduce((s, c) => s + c.qty * c.item.price, 0);
    },
    validName() {
      return /^[A-Za-z\s]+$/.test(this.form.name.trim());
    },
    validPhone() {
      return /^[0-9]+$/.test(this.form.phone.trim());
    },
    canCheckout() {
      return this.cartCount > 0 && this.validName && this.validPhone;
    },
  },
  methods: {
    toggleView() {
      this.view = this.view === 'lessons' ? 'cart' : 'lessons';
      this.orderDone = false;
    },
    toggleOrder() {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    },
    addToCart(lesson) {
      if (lesson.spaces === 0) return;
      lesson.spaces--;
      if (!this.cart[lesson.id]) this.cart[lesson.id] = { item: lesson, qty: 0 };
      this.cart[lesson.id].qty++;
    },
    removeFromCart(lesson) {
      if (!this.cart[lesson.id]) return;
      lesson.spaces += this.cart[lesson.id].qty;
      delete this.cart[lesson.id];
    },
    checkout() {
      if (!this.canCheckout) return;
      this.cart = {};
      this.orderDone = true;
      this.form = { name: '', phone: '' };
    },
    registerUser(user) {
      if (this.users.find((u) => u.email === user.email)) {
        this.registerError = 'Email already registered';
        return;
      }
      this.users.push(user);
      this.registerError = '';
      alert('Registration successful! Please log in.');
      this.view = 'login';
    },
    loginUser(credentials) {
      const user = this.users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
      if (!user) {
        this.loginError = 'Invalid email or password';
        return;
      }
      this.loggedInUser = user;
      this.loginError = '';
      this.view = 'lessons';
    },
    logout() {
      this.loggedInUser = null;
      this.cart = {};
      this.view = 'login';
    },
  },
  template: `
    <div class="container py-4">
      <HeaderBar v-if="view !== 'login' && view !== 'register'"
                 :cartCount="cartCount"
                 @toggleView="toggleView"
                 @logout="logout" />

      <LoginView v-if="view === 'login'"
                 @login="loginUser"
                 @switchRegister="view = 'register'"
                 :error="loginError" />

      <RegisterView v-else-if="view === 'register'"
                    @register="registerUser"
                    @switchLogin="view = 'login'"
                    :error="registerError" />

      <LessonList v-else-if="view === 'lessons'"
                  :lessons="sortedLessons"
                  :searchQuery="searchQuery"
                  :sort="sort"
                  @addToCart="addToCart"
                  @toggleOrder="toggleOrder"
                  v-model:searchQuery="searchQuery"
                  v-model:sort="sort" />

      <CartView v-else
                :cartItems="cartItems"
                :cartCount="cartCount"
                :cartTotal="cartTotal"
                :form="form"
                :validName="validName"
                :validPhone="validPhone"
                :canCheckout="canCheckout"
                :orderDone="orderDone"
                @checkout="checkout"
                @removeItem="removeFromCart"
                @back="toggleView"
                v-model:form="form" />
    </div>
  `
};