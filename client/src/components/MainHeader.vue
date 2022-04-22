<template>
  <header class="main-header">
    <div class="header-container">
      <a href="" class="site-logo"
        ><img
          src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
          alt="Site logo image"
          class="site-logo-img"
      /></a>
      <div class="search-bar">
        <input type="text" name="search-bar" id="" placeholder="Search..." />
        <button class="submit-btn">
          <SearchIcon />
        </button>
      </div>
      <div class="header-items-right">
        <a class="create-post">Create Post</a>
        <a class="notifications"><BellIcon /></a>
        <div class="menu">
          <button>
            <span>
              <img
                src="https://res.cloudinary.com/practicaldev/image/fetch/s----BXFj9n--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/388717/c8a6ddef-627d-4fc3-ad73-3de02f122ae2.png"
                alt=""
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import BellIcon from './icons/BellIcon.vue';
import SearchIcon from './icons/SearchIcon.vue';
</script>

<style>
.main-header {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;

  background-color: rgb(23, 23, 23);
  box-shadow: rgb(0, 0, 0) 0px 1px 1px 0px;
}

.header-container {
  display: flex;
  align-items: center;
  height: 56px;
  max-width: 1280px;
  padding: 0 1rem;
  margin: auto;
}

.site-logo-img {
  max-width: 100%;
  width: auto;
  height: 40px;
  object-fit: contain;
  vertical-align: middle;
  display: inline-block;
  outline: 0;
}
.search-bar {
  margin: 0 1rem;
  max-width: 420px;
  flex: 1 auto;
  display: flex;
  position: relative;
}

.search-bar input {
  border: 1px solid rgb(64, 64, 64);
  background: #000;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 7px 8px;
  color: white;
  border-radius: 0.375rem;
}

.search-bar input::placeholder {
  color: #575757;
  opacity: 1; /* Firefox */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.submit-btn {
  background-color: transparent;
  border: 0;
  color: rgb(212, 212, 212);
  position: absolute;
  right: 1px;
  bottom: 1px;
  padding: 0 0.5rem;
  top: 1px;
  line-height: 12px;
  font-size: 16px;
  font-family: inherit;
}

.header-items-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.create-post {
  margin-right: 0.5rem;
  border: 1px solid rgb(129, 140, 248);
  color: rgb(129, 140, 248);
  padding: calc(0.5rem - 1px) calc(1rem - 1px);
  line-height: 24px;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
}
.notifications {
  margin: 0 0.25rem;
  padding: 0.5rem;
  color: rgb(212, 212, 212);
  vertical-align: bottom;
}
.menu {
  margin: 0 0.5rem;
}

.menu button {
  border-radius: 100%;
  padding: 0;
  border: 0;
}
.menu button span {
  width: 2rem;
  height: 2rem;
  display: inline-block;
  vertical-align: middle;
}

.menu button span img {
  border-radius: 100%;
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: bottom;
}
</style>
