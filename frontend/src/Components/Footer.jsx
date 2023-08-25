export const Footer = () => {
    return (
        <footer className="py-3 text-center text-gray-500 space-x-2" >
            <span>© {new Date().getFullYear()} CoLivingMate.</span> <span>All Rights Reserved.</span> <span>Made with 💜 by <a href={"https://github.com/NasssDev"} target={"_blank"} className={"text-indigo-600 hover:text-indigo-400"}>@<span className={"underline font-normal"}>NasssDev</span></a> !</span>
        </footer>
    );
};