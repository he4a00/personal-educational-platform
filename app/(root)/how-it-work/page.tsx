import Link from "next/link";

const HowItWork = () => {
  return (
    <div className="flex flex-col container p-10">
      <div className="p-5 border-b-2 border-black">
        <h1 className="text-2xl border-b-2 border-black font-semibold w-fit p-4">
          المسار الطبيعي للمنصة
        </h1>

        <div className="flex flex-col p-3 mt-5">
          <h2 className="text-xl font-semibold mb-5">
            1- اولا عليك انشاء حساب بالمنصة لتستطيع استخدام جميع مميزاتها ،
            تستطيع انشاء حساب من{" "}
            <Link className="text-blue-500" href="/sign-up">
              هنا.
            </Link>
          </h2>

          <h2 className="text-xl font-semibold mb-5">
            2- عليك التاكد من أضافة جميع البيانات بصورة صحيحة ، لان هذه البيانات
            ستكون سبب سلاسة التعامل بالمنصة.
          </h2>

          <h2 className="text-xl font-semibold mb-5">
            3- بعد انشاء الحساب بالبيانات الصحيحة تتوجه الي صفحة تسجيل الدخول من{" "}
            <Link className="text-blue-500" href="/sign-in">
              هنا.
            </Link>
          </h2>

          <h2 className="text-xl font-semibold mb-5">
            4- الان تستطيع التجول في المنصة مثل ما تريد ، بناية عن الصف الدراسي
            الخاص بك تستطيع رؤية الدروس المخصصة لهذا الصف
          </h2>
          <h2 className="text-xl font-semibold mb-5">
            5- في كل صف دراسي جزئان ، الجزء الاول وهو اختيار القسم الخاص بالدرس
            (مثل الجبر او الهندسة) ، والجزء الثاني هو اختيار الوحدة
          </h2>
          <h2 className="text-xl font-semibold mb-5">
            6- بعد اختيارك للمعلومات التي تريدها سيظهر لك الدروس ، وهناك نوعان
            من الدروس المتاحة ، البعض منها بصورة مجانية والاخر بصورة مدفوعة
          </h2>
          <h2 className="text-xl font-semibold mb-5">
            7- النوع الاول وهو الدروس المجانية ، هذه الدروس تكون مجانية ومتاحة
            للجميع ليشاهدها ولكن بشرط ان تكون مسجل في المنصة
          </h2>
          <h2 className="text-xl font-semibold mb-5">
            8- النوع الثاني وهو الدروس المدفوعة ، هذه الدروس لن تكون متاحة
            للجميع ، للحصول عليها عليك اتمام عملية الدفع الخاصة بها
          </h2>
          <h2 className="text-xl font-semibold mb-5">
            9- لكل درس واجب خاص به ، سواء الدروس المجانية ام المدفوعة ، عند
            اتمام الدفع واضافة الدرس لك سيتم اضافة الواجب الخاص به لك تلقائيا
          </h2>
        </div>
      </div>
      <h1 className="text-2xl border-b-2 border-black font-semibold w-fit p-4 mt-5">
        طريقة دفع الدروس المدفوعة
      </h1>
      <div className="flex flex-col p-5">
        <h2 className="text-xl font-semibold mb-5">
          1- اولا عليك التأكد من صحة بياناتك المسجل بها علي المنصة
        </h2>
        <h2 className="text-xl font-semibold mb-5">
          2- عليك تحديد الدرس المراد فتحه لك ثم نسخ العنوان الخاص بيه
        </h2>
        <h2 className="text-xl font-semibold mb-5">
          3- ثم تحويل النقود المحددة لهذا الدرس عن طريق اي محفظة الكترونية لهذا
          الرقم 01003687693
        </h2>
        <h2 className="text-xl font-semibold mb-5">
          4- بعد التحويل تأكد من تصوير الوصل الخاص بالعملية وارساله لنفس الرقم
          علي الواتس اب مع ارسال الرقم المسجل به علي المنصة وعنوان الدرس المراد
          فتحه لك
        </h2>
        <h2 className="text-xl font-semibold mb-5">
          تأكد من ارسال الرقم المسجل به علي المنصة عند انشاء الحساب .. مهم جدا.
        </h2>
      </div>
    </div>
  );
};

export default HowItWork;
