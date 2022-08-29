const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <p className="text-white text-center bg-black block p-2">
        ©2022{' '}
        <a className="font-semibold hover:underline text-yellow-600" href="">
          Amr Guaily
        </a>
        . Some rights reserved.
      </p>
    </div>
  );
};

export default Footer;
