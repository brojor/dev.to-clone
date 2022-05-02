<template>
  <section class="comments">
    <header>
      <h2>Discussion (10)</h2>
      <button class="subscribe">Subscribe</button>
    </header>
    <div class="comment-container">
      <form action="" class="new-comment">
        <span class="avatar">
          <img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s----BXFj9n--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/388717/c8a6ddef-627d-4fc3-ad73-3de02f122ae2.png"
            alt="avatar image"
          />
        </span>
        <div class="comment">
          <textarea
            placeholder="Add to the discussion"
            name="comment"
          ></textarea>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.comments {
  background-color: rgb(23, 23, 23);
  padding: 2rem 4rem;
  margin-bottom: 1rem;
  border-top: 1px solid #242424;
  header {
    display: flex;
    margin-bottom: 1.5rem;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 1.5rem;
      color: #efefef;
      font-weight: 700;
      margin: 0;
    }
  }
  button.subscribe {
    border-radius: 0.375rem;
    font-size: 1rem;
    line-height: 1.5rem;
    cursor: pointer;
    border: 2px solid #3d3d3d;
    background: transparent;
    color: #d6d6d7;
    padding: calc(0.5rem - 1px) calc(1rem - 1px);
    font-family: inherit;
    font-weight: 500;
  }
}
.comment-container {
  .new-comment {
    display: flex;
  }
  .avatar {
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-color: var(--card-color-tertiary);
    flex-shrink: 0;
    display: relative;

    img {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      display: inline-block;
      vertical-align: bottom;
    }
  }
  .comment {
    width: 100%;
    textarea {
      width: 100%;
      white-space: pre-wrap;
      padding: 0.5rem;
      border-radius: 0.375rem;
      background-color: rgb(0, 0, 0);
      font-size: 1rem;
      font-family: inherit;
      border: 1px solid rgb(64, 64, 64);
      line-height: 1.5;
      &::placeholder {
        color: rgb(82, 82, 82);
      }
    }
  }
}
</style>
