import { NextResponse } from "next/server";
import transporter from "./transporter";

export async function POST(req, res) {
    const data = await req.json();
    const prompt = `
    Write a cold mail as html to tell about our ${data.service} services that build a brand value online bringing the essence of genuine presence and trust. I am Priyanshu Kushwaha and you have to write email to ${data.name}. Keep the email well formatted and maintain spacings and line breaks between the paragraphs. each paragraph should contain only one line after each line there should be two line breaks. use as simple words as possible

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
    Our Logo : https://www.codestam.com/mainLogo.svg

    Add proper Svgs icons
    

    Keep These things in mind : 
    1. **Personalize**: Address the recipient by name and reference their company.

2. **Clear Subject Line**: Craft a concise and relevant subject to entice opens.

3. **Strong Opener**: Start with a compelling introduction to grab attention.

4. **Address Pain Points**: Show understanding of the recipient's challenges.

5. **Benefits Over Features**: Emphasize how your offering solves problems.

6. **Build Credibility**: Highlight your company's achievements or experience.

7. **Include Social Proof**: Showcase testimonials or successful cases.

8. **Clear Call-to-Action (CTA)**: Clearly state the desired next step.

9. **Follow-Up Plan**: Politely express understanding and outline a follow-up.

10. **Mobile-Friendly**: Ensure your email is easy to read on mobile devices.
    `;

    try {
        const response = await fetch(process.env.GPT_URL, {
            method: 'POST',
            body: JSON.stringify({ input: prompt }),
            headers: { 'Content-Type': 'application/json' }
        });

        const email = await response.json();

        const formattedMail = email.replace('```html', '').replace('```', '')

        const mailSent = await transporter.sendMail({
            from: '"Priyanshu Kushwaha" <noreply@codestam.com>', // sender address
            to: `${data.email}, souravvmishra@gmail.com, kushwaha@codestam.com`, // list of receivers
            // to: 'souravvmishra@gmail.com',
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
