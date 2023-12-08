import { NextResponse } from "next/server";
import transporter from "./transporter";

export async function POST(req, res) {
    const data = await req.json();
    const prompt = `Write a cold mail as html to tell about our ${data.service} services that build a brand value online bringing the essence of genuine presence and trust. I am Priyanshu Kushwaha and you have to write email to ${data.name}. Keep the email well formatted and maintain spacings and line breaks between the paragraphs. each paragraph should contain only one line after each line there should be two line breaks. use as simple words as possible

    Bold the important words as well as underline using html
    add proper heading tags
    
    Details About Company : 
    Name : ${data.name}
    Email : ${data.email}
    About : ${data.message}
    Service To Offer : ${data.service}

    IMPORTANT : ONLY WRITE THE BODY OF MAIL (no subject line) USING HTML NOTHING ELSE 
    start with <html>
    and end with </html>

    dont include any tildas 
    dont write the subject line

    OUR COMPANY WEBSITE : 'https://www.codestam.com' Do mention this
    
    `;

    try {
        const response = await fetch(process.env.GPT_URL, {
            method: 'POST',
            body: JSON.stringify({ input: prompt }),
            headers: { 'Content-Type': 'application/json' }
        });

        const email = await response.json();

        const formattedMail = email.replace('`', '')

        const mailSent = await transporter.sendMail({
            from: '"Priyanshu Kushwaha" <noreply@codestam.com>', // sender address
            to: `${data.email}, souravvmishra@gmail.com`, // list of receivers
            subject: "This is a cold email", // Subject line
            text: formattedMail, // plain text body
            html: formattedMail, // html body
        });

        return new NextResponse(JSON.stringify({
            error: false,
            email,
            mailSent
        }));

    }


    catch (error) {
        return new NextResponse(JSON.stringify({
            error: true,
            message: 'Something Went Wrong',
            reason: error
        }));
    }
}
