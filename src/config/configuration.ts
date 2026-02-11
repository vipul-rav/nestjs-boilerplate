export default () => ({
  port: process.env.PORT ?? 3000,
  pgDBUrl: process.env.DB_URL,
});
