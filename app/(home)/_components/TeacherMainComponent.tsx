import CreateTemplateBox from "./CreateTemplateBox";
import StudentList from "./StudentList";

const TeacherMainComponent = () => {
  return (
    <div className="p-4 md:p-8">
      <section>
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-8">
            <CreateTemplateBox />
            <StudentList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherMainComponent;
