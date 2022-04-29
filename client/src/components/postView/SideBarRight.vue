<template>
  <aside class="sidebar-right">
    <div class="wrapper">
      <div class="user-card">
        <div class="avatar-and-name">
          <a href="/username">
            <span class="avatar"
              ><img
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--P4HnHvGk--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/6401/db5b0ab6-93a1-4168-9f97-af8d363c1153.png"
                alt="User avatr"
            /></span>
            <span class="name">Cassidy Williams</span>
          </a>
        </div>
        <button class="follow">Follow</button>
        <p class="summary">bold and brash</p>

        <ul class="user-meta-data">
          <li>
            <div class="key">Location</div>
            <div class="value">Chicago, IL</div>
          </li>
          <li>
            <div class="key">Education</div>
            <div class="value">B.S. Computer Science</div>
          </li>
          <li>
            <div class="key">Work</div>
            <div class="value">
              Head of Developer Experience and Education at Remote
            </div>
          </li>
          <li>
            <div class="key">Joined</div>
            <div class="value">22. 2. 2017</div>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup></script>

<style lang="scss">
.sidebar-right {
  .wrapper {
    position: sticky;
    top: 4.5rem;
  }
}
.user-card {
  border-top: 2rem solid;
  border-top-color: #cf3f78;
  display: grid;
  padding: 1rem;
  padding-top: 0;
  gap: 1rem;
  background: var(--card-secondary-bg);
  color: var(--card-secondary-color);
  box-shadow: 0 0 0 1px var(--card-secondary-border);
  border-radius: 6px;
  button {
    border: none;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
    cursor: pointer;
    background-color: var(--button-primary-bg);
    color: var(--button-primary-color);
  }
  .summary {
    color: #bdbdbd;
    font-size: 1rem;
    line-height: 24px;
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding-left: 0;
    li + li {
      margin-top: 0.75rem;
    }
    .key {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--card-color-tertiary);
    }
    .value {
      font-size: 1rem;
    }
  }
}

.avatar-and-name a {
  display: flex;
  text-decoration: none;

  color: var(--link-color);
  margin-top: -1rem;
  .avatar {
    margin-right: 0.5rem;
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    display: inline-block;
    border-radius: 100%;
    img {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      display: inline-block;
      vertical-align: bottom;
    }
  }
  .name {
    margin-top: 1.25rem;
    color: var(--link-color);
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: 700;
  }
}
</style>
